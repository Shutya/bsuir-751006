const API_KEY = "38f6b3ab94ad406db0b847023741dc13";
const API_DOMAIN = 'https://newsapi.org/v2/'

const PER_PAGE = 6;
const MAX_PAGES = 8;

export default function Model() {
    this.loaded = [];
    this.pointer = 0;
};

Model.prototype.loadSources = async function() {
    const url = API_DOMAIN + '/sources?country=us&language=en&apiKey='+API_KEY;
    const req = new Request(url);
    return fetch(req).then(json => json.json());
};

Model.prototype.loadRequest = async function(request = {}, sources = new Set()) {
    this.pointer = 0;
    const endpoint = request.endpoint || (sources.size ? "everything" : "top-headlines");
    request.endpoint = undefined;
    let url = `${API_DOMAIN}${endpoint}?`;
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
