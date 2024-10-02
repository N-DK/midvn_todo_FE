export const checker = {
  includeStringKey: (stringCheck: string, string: string) => {
    return stringCheck?.toLowerCase?.()?.includes?.(string?.toLowerCase?.())
  },
}
