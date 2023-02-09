import values from "./values/values"
import classes from "./classes"

export type ClassType = keyof typeof classes
export type SpecialClassName = "overflow-hidden" | "h-auto" | "w-auto" | "capitalize" | "uppercase" | "lowercase"
| "overflow" | "overflow-x" | "overflow-y"
export type ClassName = `${ClassType}-${ClassValueName}` | SpecialClassName
export type ClassList = ClassName[]

export type UDimValueName = keyof typeof values.udim
export type Color3ValueName = keyof typeof values.color3
export type Vector2ValueName = keyof typeof values.vector2
export type LeadingValueName = keyof typeof values.leading
export type BorderValueName = keyof typeof values.border
export type ZValueName = keyof typeof values.z
export type RoundedValueName = keyof typeof values.rounded
export type BorderOpacityValueName = keyof typeof values.borderOpacity
export type TextValueName = keyof typeof values.text
export type FontWeightValueName = keyof typeof values.fontWeight
export type AspectValueName = keyof typeof values.aspect

export type ClassValueName = UDimValueName | Color3ValueName | Vector2ValueName |
LeadingValueName | BorderValueName | ZValueName | RoundedValueName | BorderOpacityValueName
| TextValueName | FontWeightValueName | AspectValueName

export type ClassValueType = "udim" | "color3" | "vector2" | "leading" 
| "border" | "z" | "special" | "rounded" | "border-opacity" | "text" | "font-weight"
| "string" | "aspect"