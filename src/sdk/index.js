const baseUrl = "http://127.0.0.1:8000/api/v1.0"

export const fetchAlarmsSDK = async () => {
    const storedToken = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);
   
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    const response = await fetch(`${baseUrl}/alarm/`, requestOptions);
    if (!response.ok)
        throw new Error("Failed to fetch reports");

    const result = await response.json();
    if (result.success) 
        return result
    else
        throw new Error(result.message || "Failed to fetch reports");
}

export const deleteAlarmSDK = async (alarmId) => {
    const storedToken = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    const result = await fetch(
    `${baseUrl}/alarm/${alarmId}`,
    requestOptions
    );

    if (!result.ok) throw new Error("Failed to delete report");
    return result
}

export const createAlarmSDK = async (input) => {
    const storedToken = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(input),
    };
    const response = await fetch(
        `${baseUrl}/alarm/`,
        requestOptions
    );

    if (!response.ok)
        throw new Error("Failed to creating alarm");

    return await response.json();
}

export const updateAlarmSDK = async (id, input) => {
    const storedToken = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(input),
    };
    const response = await fetch(
        `${baseUrl}/alarm/${id}`,
        requestOptions
    );

    if (!response.ok)
        throw new Error("Failed to creating alarm");

    return await response.json();
}

export const fetchKPIsSDK = async (site) => {
    const storedToken = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };
    if (!site) throw new Error("Failed to fetch KPIs");
    const response = await fetch(
        `${baseUrl}/kpi/?site=${site}`,
        requestOptions
    );

    if (!response.ok)
        throw new Error("Failed to fetch KPIs");
    return await response.json();
}

export const fetchUserSDK = async () => {
    const storedToken = localStorage.getItem("token");
      if (!storedToken) return;
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);
      myHeaders.append("Content-Type", "application/json");
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };
    const response = await fetch(`${baseUrl}/user/`, requestOptions);
    return await response.json()
}