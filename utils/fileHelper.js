import fs from "fs";


// export function saveToJson(data, path) {
//     fs.writeFile(path, data, (err) => {
//         if (err) {
//             console.log("Something error occured");
//             return;
//         }
//         else {
//             console.log("File Written Success");
//         }
//     })
// }


export async function saveToJson(data, path) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}