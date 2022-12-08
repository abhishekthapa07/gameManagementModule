import { IGameParams } from "@/interface";

/**
 * It get modified data from removeEmpty function and modify received form data
 * It get valid query string from get QueryString and store in variable
 * It's checking if game is selected from dropdown list or not then assigning link accordingly
 */
export default function linkGenerator(formData: IGameParams, gameId: string): string {
  let link: string, queryString: string;
  formData = removeEmpty(formData);
  queryString = getQueryString(formData);
  link = formData.game_id
    ? `www.site.com?${queryString}`
    : `www.site.com?game_id=${gameId}&${queryString}`;
  return link;
}

/**
 * 
    1. It's taking in the formData object from the form.
    2. It's looping through the formData object and checking if any of the values are empty strings.
    3. If they are empty strings, it's deleting them from the object.
    4. It's replacing form data value with spaces into plus(+) for URL
 */
function removeEmpty(formData: IGameParams) {
  for (let key in formData) {
    let formKey = formData[key as keyof IGameParams];
    if (formKey === "") {
      delete formData[key as keyof IGameParams];
    } else if (formKey.indexOf(" ") > -1) {
      formData[key as keyof IGameParams] = formKey.replace(/ /g, "+");
    }
  }
  return formData;
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
