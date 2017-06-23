export const getEvents = async () => {
  try {
    const response = await fetch("http://localhost:8082/api/calendar")
    const events = await response.json()
    console.log(events)
    return events
  } catch (err) {
    console.error(err)
  }
}
