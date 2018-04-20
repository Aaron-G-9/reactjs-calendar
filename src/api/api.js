const getDemoEvents = async () => {
  console.warn("Running in demo mode")
  return await fetch("https://gist.githubusercontent.com/Aaron-G-9/33e35d1a86d401fc1a1e678dc66faf17/raw/0ee132cc76254650dd27758184f88eec92512ea0/CalendarEvents.json").then(response => response.json())
}

export const getEvents = async obj => {
  try {
    let response
    if (Object.is(obj.url, "Demo")){
      return getDemoEvents()
    }else if ((Object.is(obj, null)) || (obj.credentialsNeeded === false)){
      response = await fetch(obj.url)
    }else{

      let data = {
        code: obj.code,
        description: obj.description,
        current: obj.code,
        end: obj.end,
        start: obj.start
      }

      const formBody = Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")

      response = await fetch(obj.url, { 
        body: formBody,
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        }, 
        method: "POST"
      })
    }
    const events = await response.json()
    return events.events
  } catch (err) {
    console.log("OOF")
    console.error(err)
  }
}

export const getCourses = async (term, url) => {
  try {
    const response = await fetch(url, {
      body: JSON.stringify({ code: term.code }),
      method: "POST"
    })
    const courses = await response.json()
    return courses
  } catch (err) {
    return err
  }
}
