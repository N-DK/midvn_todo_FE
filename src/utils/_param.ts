export const getTokenParam = () => {
  const currentUrl = window.location.href

  // Tạo đối tượng URL để dễ xử lý

  const url = new URL(currentUrl)
  const token = url.searchParams.get("token")
  return token
}

export const getParam = (key: string) => {
  const currentUrl = window.location.href
  const url = new URL(currentUrl)
  return url.searchParams.get(key)
}
