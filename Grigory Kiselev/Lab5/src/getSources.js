import "regenerator-runtime/runtime";

export async function getSources() {
    console.log('Hello');
	var url = 'https://newsapi.org/v2/sources?' +
	          'country=us&' +
	          'apiKey=4039118a1f7247be89caa1d84d8261fa';
    var req = new Request(url);
    var result = await fetch(req);
    var response = await result.json();
    return response.sources;
}