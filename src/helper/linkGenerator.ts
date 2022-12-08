import { IGameParams } from "@/interface";

/**
 * 
    1. It's taking in the formData object from the form.
    2. It's looping through the formData object and checking if any of the values are empty strings.
    3. If they are empty strings, it's deleting them from the object.
    4. It's replacing form data value with spaces into plus(+) for URL
    5. It's checking if game is selected from dropdown list or not then assigning link accordingly
 */
export default function linkGenerator(formData: IGameParams, gameId: string): string {
  let link: string, queryString: string;
  for (const key in formData) {
    let formKey = formData[key as keyof IGameParams];
    if (formKey === "") {
      delete formData[key as keyof IGameParams];
    }
    if (formKey.includes(" ")) {
      formKey = formKey.split(" ").join("+");
    }
  }
  queryString = getQueryString(formData);
  link = formData.game_id
    ? `www.site.com?${queryString}`
    : `www.site.com?game_id=${gameId}&${queryString}`;
  return link;
}

/**
 *
 * @param params formData
 * @returns dynamic link for query with value provided
 */
function getQueryString(params: any) {
  let queryString = Object.keys(params)
    .map(function (key) {
      return key + "=" + params[key];
    })
    .join("&");
  return queryString;
}
