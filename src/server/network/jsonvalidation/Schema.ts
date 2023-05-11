export type Schema =
  | EnumSchema
  | EnumLiteralSchema
  | StringSchema
  | StringLiteralSchema
  | NumberSchema
  | ArraySchema
  | ObjectSchema
  | LiterallyTypedObjectSchema
  | AnySchema;

interface EnumSchema {
  type: "enum";
}

interface EnumLiteralSchema {
  type: "enum_literal";
  num: number;
}

interface StringSchema {
  type: "string";
}
interface StringLiteralSchema {
  type: "string_literal";
  str: string;
}

interface NumberSchema {
  type: "number";
}

interface ArraySchema {
  type: "array";
  val_type: Schema;
}

interface ObjectSchema {
  type: "object";
  attributes: AttributeSchema[];
}

interface LiterallyTypedObjectSchema {
  type: "literally_typed_object";
  literal_value: Schema;
  attributes: AttributeSchema[];
}

interface AnySchema {
  type: "any";
  options: Schema[];
}

export interface AttributeSchema {
  type: "attribute";
  key: string;
  type_schema: Schema;
  is_optional?: boolean;
}
