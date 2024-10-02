export const filterOptions = {
  select: (q: any, v: any) => {
    const val = `${v?.label}`
    return !!val?.toLocaleLowerCase?.()?.includes?.(q?.toLocaleLowerCase?.())
  },
}
