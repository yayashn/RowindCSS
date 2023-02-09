import classes from "../classes"
import { BorderValueName, ClassList, ClassName, ClassType, ClassValueName, ClassValueType, RoundedValueName, Color3ValueName, UDimValueName, Vector2ValueName, ZValueName, BorderOpacityValueName, LeadingValueName, TextValueName, FontWeightValueName, AspectValueName } from "../types"
import values from "../values/values"
import Object from "@rbxts/object-utils"

const parseValue = (class_ : ClassName, classType: ClassType, specialClassValues: ClassName[], valueType: ClassValueType) => {
    if(classType === (class_ as unknown) || (valueType === "special" && (specialClassValues.some(s => s === class_)))) {
        return class_
    } else if(class_.match(`^${classType}%-`).size() > 0) {
        let classValueString = class_.split(`${classType}-`)[1] as ClassValueName
        const isUDim = valueType === "udim"
        const isColor3 = valueType === "color3"

        if(classValueString.match("%[").size() > 0) {
            const classArbitraryValue = classValueString.sub(1,-2).sub(2)
            if(isUDim) {
                if(classArbitraryValue.match("px").size() > 0) {
                    return new UDim(0, tonumber(classArbitraryValue.sub(1,-3)))
                } else if(classArbitraryValue.match("%%").size() > 0) {
                    return new UDim(tonumber(classArbitraryValue.sub(1,-2))!/100, 0)
                }
            } else if(isColor3) {
                if(classArbitraryValue.match("^rgb").size() > 0) {
                    const [r, g, b] = classArbitraryValue.sub(5,-2).split(",").map(c => tonumber(c)!).filter(c => c !== undefined)
                    return Color3.fromRGB(r, g, b)
                } else if(classArbitraryValue.match("^#").size() > 0) {
                    return Color3.fromHex(classArbitraryValue)
                }
            } else if(tonumber(classArbitraryValue)) {
                return tonumber(classArbitraryValue)
            } else if(classArbitraryValue.match("px").size() > 0) {
                return classArbitraryValue.sub(1,-3)
            } else if(classArbitraryValue.match("/").size() > 0) {
                const [up, down] = classArbitraryValue.split("/") as unknown as [string, string];
                return tonumber(up)!/tonumber(down)!
            }
            else {
                return classArbitraryValue
            }
        } else {
            const hasUDim = isUDim
                            && Object.keys(values.udim).some(u => u === classValueString)

            const isColor3 = valueType === 'color3'
                        && Object.keys(values.color3).some(u => u === classValueString)

            const isVector2 = valueType === 'vector2'
                        && Object.keys(values.vector2).some(u => u === classValueString)
            
            const isZ = valueType === 'z'
                        && Object.keys(values.z).some(u => u === classValueString)

            const isBorder = valueType === 'border'
                        && Object.keys(values.border).some(u => u === classValueString)

            const isRounded = valueType === 'rounded'
                        && Object.keys(values.rounded).some(u => u === classValueString)

            const isBorderOpacity = valueType === 'border-opacity'
                        && Object.keys(values.borderOpacity).some(u => u === classValueString)
            
            const isLeading = valueType === 'leading'
                        && Object.keys(values.leading).some(u => u === classValueString)

            const isText = valueType === 'text'
                        && Object.keys(values.text).some(u => u === classValueString)

            const isFontWeight = valueType === 'font-weight'
                        && Object.keys(values.fontWeight).some(u => u === classValueString)
            
            const isAspect = valueType === 'aspect'
                        && Object.keys(values.aspect).some(u => u === classValueString)


            if(hasUDim) {
                return values.udim[classValueString as UDimValueName]
            } else if(isColor3) {
                return values.color3[classValueString as Color3ValueName]
            } else if(isZ) {
                return values.z[classValueString as ZValueName]
            } else if(isVector2) {
                return values.vector2[classValueString as Vector2ValueName]
            } else if (isBorder) {
                return values.border[classValueString as BorderValueName]
            } else if (isRounded) {
                return values.rounded[classValueString as RoundedValueName]
            } else if (isBorderOpacity) {
                return values.borderOpacity[classValueString as BorderOpacityValueName]
            } else if(isLeading) {
                return values.leading[classValueString as LeadingValueName]
            } else if(isText) {
                return values.text[classValueString as TextValueName]
            } else if(isFontWeight) {
                return values.fontWeight[classValueString as FontWeightValueName]
            } else if(isAspect) {
                return values.aspect[classValueString as AspectValueName]
            }
        }
    }
    return false
}

export default (classList: ClassList, classType: ClassType, valueType: ClassValueType = classes[classType].valueTypes[0] as ClassValueType) => {
    const hovered = classList.find(c => c === "+hovered" as ClassName)
    const classListHovered = classList.filter(c => c.match("^hover").size() > 0)
    const specialClassValues = ((classes[classType] as any).specialValues || []) as ClassName[]
    for(let class_ of classList) {
        const parsedValue = parseValue(class_, classType, specialClassValues, valueType)
        const parsedValueHovered = (() => {
            const classHovered = classListHovered.find(c => c.match(`^hover:${classType}`).size() > 0)
            if(classHovered) {
                return parseValue(classHovered.sub(7) as ClassName, classType, specialClassValues, valueType)
            }
        })()

        if(hovered && parsedValueHovered) {
            return parsedValueHovered
        } else if(parsedValue) {
            return parsedValue
        }
    }
    return false
}