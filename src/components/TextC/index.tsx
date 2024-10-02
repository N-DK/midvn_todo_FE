import { Typography } from "antd"
import { TextProps } from "antd/es/typography/Text"
const { Paragraph, Text } = Typography

interface ITextEllipsis {
  text: string
  style?: React.CSSProperties
  props?: TextProps
  tooltip?: boolean
}
export const TextEllipsis: React.FC<ITextEllipsis> = ({
  text,
  style,
  props,
  tooltip,
}) => (
  <Text style={style} ellipsis={{ tooltip: tooltip ? text : false }} {...props}>
    {text}
  </Text>
)
