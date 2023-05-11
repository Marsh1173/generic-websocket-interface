import { ServerConfig } from "../../../tools/server/server-config";
import { AttributeSchema, Schema } from "./Schema";

export class JsonParser<T> {
  private readonly regex: RegExp;
  constructor(schema: Schema) {
    this.regex = Regex.tools.only(JsonParser.GetSchemaVerifier(schema));
  }

  public parse(json: string): T | undefined {
    if (json.match(this.regex)) {
      return JSON.parse(json) as T;
    } else {
      if (new ServerConfig().get().is_development) {
        console.error("ERROR PARSING MESSAGE:");
        console.error(json);
        console.error("WITH REGEX:");
        console.error(this.regex);
      }
      return undefined;
    }
  }

  private static GetAttributeVerifier(
    schema: AttributeSchema,
    include_comma: boolean
  ): RegExp {
    return Regex.Type.attribute(
      schema.key,
      JsonParser.GetSchemaVerifier(schema.type_schema),
      include_comma,
      schema.is_optional
    );
  }

  private static GetSchemaVerifier(schema: Schema): RegExp {
    switch (schema.type) {
      case "enum":
        return Regex.Type.enum;
      case "enum_literal":
        return Regex.Type.enum_literal(schema.num);
      case "number":
        return Regex.Type.number;
      case "string":
        return Regex.Type.string;
      case "string_literal":
        return Regex.Type.string_literal(schema.str);
      case "any":
        return Regex.tools.any(
          ...schema.options.map(JsonParser.GetSchemaVerifier)
        );
      case "array":
        return Regex.Type.array(JsonParser.GetSchemaVerifier(schema.val_type));
      case "object":
        return Regex.Type.object(
          ...schema.attributes.map((attr, i) =>
            JsonParser.GetAttributeVerifier(
              attr,
              i === schema.attributes.length - 1
            )
          )
        );
      case "literally_typed_object":
        return Regex.Type.object(
          ...schema.attributes.map((attr) =>
            JsonParser.GetAttributeVerifier(attr, true)
          ),
          JsonParser.GetAttributeVerifier(
            {
              type: "attribute",
              key: "type",
              type_schema: schema.literal_value,
            },
            false
          )
        );
    }
  }
}

class Regex {
  private constructor() {}

  public static Type = {
    enum: /\d+/,
    enum_literal: (num: number): RegExp => new RegExp(num.toString()),
    number: /-?\d+(?:\.\d+)?/,
    string: /"[^\n\r"]*?"/,
    string_literal: (key: string): RegExp => new RegExp(`"` + key + `"`),
    array: (type_regex: RegExp) =>
      new RegExp(
        `(?:\\[(?:` +
          type_regex.source +
          `(?:,` +
          type_regex.source +
          `)*)?\\])`
      ),
    object: (...attribute_regexes: RegExp[]): RegExp => {
      return new RegExp(
        `(?:\\{` +
          attribute_regexes.map((regex) => regex.source).join(``) +
          `\\})`
      );
    },
    attribute: (
      key: string,
      type_regex: RegExp,
      include_comma: boolean,
      is_optional?: boolean
    ): RegExp => {
      return new RegExp(
        `(?:` +
          this.Type.string_literal(key).source +
          `:` +
          type_regex.source +
          (include_comma ? `,` : ``) +
          `)` +
          (is_optional ? `?` : ``)
      );
    },
  };

  public static tools = {
    /**
     * Meant to be used as a wrapper for complete regexes.
     */
    only: (regex: RegExp, flags?: string | undefined): RegExp =>
      new RegExp("^" + regex.source + "$", flags),

    any: (...regexes: RegExp[]): RegExp =>
      new RegExp(
        `(?:` + regexes.map((r) => "(?:" + r.source + ")").join("|") + `)`
      ),

    all: (...regexes: RegExp[]): RegExp =>
      new RegExp(regexes.map((r) => "(?:" + r.source + ")").join("")),
  };
}
