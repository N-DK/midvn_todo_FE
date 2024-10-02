export function getData(data: any): any {
  const groupedData = data.reduce((acc: any, item: any) => {
    const {
      vehicle_id,
      user_id,
      is_deleted,
      license,
      license_plate,
      category_icon,
      user_name,
      user_address,
    } = item

    if (!acc[license_plate]) {
      acc[license_plate] = {
        id: vehicle_id,
        key: vehicle_id,
        user_id,
        is_deleted,
        license,
        license_plate,
        user_name,
        user_address,
        icons: [],
      }
    }

    acc[license_plate].icons.push(category_icon)
    return acc
  }, {})

  return Object.values(groupedData).sort((a: any, b: any) => b.id - a.id)
}
