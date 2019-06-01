const API_KEY = "ac04d439a1d04b3f998d212dee14c4cf";
const PER_PAGE = 6;
const MAX_PAGES = 8;

export default function Model() {
    this.loaded = [];
    this.pointer = 0;
};

Model.prototype.loadSources = async function() {
    const url = 'https://newsapi.org/v2/sources?&language=en&apiKey='+API_KEY;
    const req = new Request(url);
    return fetch(req).then(json => json.json());
};

Model.prototype.loadRequest = async function(request = {}, sources = new Set()) {
    this.pointer = 0;
    const endpoint = request.endpoint || (sources.size ? "everything" : "top-headlines");
    request.endpoint = undefined;
    let url = `https://newsapi.org/v2/${endpoint}?`;
    request.sources = [ ...sources.values() ].join(',');
    request.language = "en";
    request = Object.entries(request);
    for (const [key, value] of request) {
        if (value) {
            url += `${key}=${encodeURI(value)}&`;
        }
    }
    url += 'pageSize='+MAX_PAGES*PER_PAGE+'&apiKey='+API_KEY;
    const req = new Request(url);
    let res = (await (await fetch(req)).json()).articles;
    if (res && res.length) {
        this.loaded = res;
    } else {
        this.loaded = [];
    }
};

Model.prototype.nextBatch = function() {
    let batch = this.loaded.slice(this.pointer, this.pointer + PER_PAGE);
    this.pointer += batch.length;
    return batch;
};

Model.prototype.hasMore = function() {
    return this.pointer < this.loaded.length;
};