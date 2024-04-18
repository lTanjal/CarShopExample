export const getCars=()=>{
return fetch(import.meta.env.VITE_API_URL)
            .then(response => {
                if (!response.ok)
                    throw new Error("error in fetch: " + response.statusText);
                return response.json();
            })
        }