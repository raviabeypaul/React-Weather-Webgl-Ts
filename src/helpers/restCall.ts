import fetch from "node-fetch";

export const get = async (url: string, headers: Record<string, any>, data ?: any) => {
  const response = await fetch(url, {
    method: "GET",
    headers: headers,
    body : JSON.stringify(data)
  });

  return await response.json();
};

export const post = async (
  url: string,
  headers: Record<string, any>,
  data: object
) => {
  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data)
  });

  return await response.json();
};

export const put = async (
  url: string,
  headers: Record<string, any>,
  data: object
) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(data)
  });

  return await response.json();
};

export const del = async (url: string, headers: Record<string, any>, data: object) => {

  let deleteOptions = {
    method: "DELETE",
    headers: headers
  }

  if(data != undefined && data != null){
    deleteOptions["body"] = JSON.stringify(data);
  }

  const response = await fetch(url, deleteOptions);

  return await response.json();
};
