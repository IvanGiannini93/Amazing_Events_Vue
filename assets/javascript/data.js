const urlAPI = 'https://mindhub-xj03.onrender.com/api/amazing';

async function getData() {
  try {
    const response = await fetch(urlAPI);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
