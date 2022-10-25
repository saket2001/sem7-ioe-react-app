export const makeFetchRequest = async (url,fetchObj) => {
  try {
    const res = await fetch(url,fetchObj);

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
    return "Failed to make connection with server!"
  }
};