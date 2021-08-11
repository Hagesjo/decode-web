function search(kw) {
    // This highly depends on the html structure of base.html.
    // If you decide to restructure base.html, you need to adjust this queryselector

    
    // "fuzzy" "search". Build an amazingly inefficient regex.
    // e.g for "hej", it will build .*h.*e.*j.*
    var searchRegex = ".*"
    for (i = 0; i < kw.length; i++) {
        searchRegex += kw[i] + ".*";
    }
    regex = new RegExp(searchRegex);

    // d is searchterm: li containing the search term
    var d = {};

    // get all releveant hrefs. #methods > li > a
    var methods = document.querySelector("#methods").children;
    for (i = 0; i < methods.length; i++) {
        // relevant search result: in the path or just within the text of the a
        a = methods[i].children[0];
        s = a.href.split('/');
        path = s[s.length-1];
        d[path] = methods[i];
        d[a.text.toLowerCase()] = methods[i];
        methods[i].hidden = true;
    }

    for (const [searchterm, li] of Object.entries(d)) {
        if (searchterm.match(regex)) {
            li.hidden = false;
        }
    }
}
