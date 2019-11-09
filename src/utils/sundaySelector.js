const getSunday = () => {
  const toSunday = new Date()
  const day = toSunday.getDay() || 7
  let diff = -24 * (day - 1)
  if (day === 1) {
    diff = day
  }

  toSunday.setHours(diff)

  return toSunday.toISOString()
}

export default getSunday
