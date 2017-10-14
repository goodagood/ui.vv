var colorCss = {
    "Question": {
        "background-color": "#ffffff",
        "color": "#8000ff"
    },
    "Todo": {
        "background-color": "white",
        "color": "#ff5050"
    },
    "IncSearch": {
        "background-color": "#f0c0ff",
        "color": "inherit"
    },
    "Type": {
        "background-color": "#ffffff",
        "color": "#7f0055"
    },
    "DiffDelete": {
        "background-color": "#e7e7ff",
        "color": "#ffffff"
    },
    "Normal": {
        "background-color": "#ffffff",
        "color": "#000000"
    },
    "DiffText": {
        "background-color": "#ffd0d0",
        "color": "red"
    },
    "VertSplit": {
        "background-color": "#904838",
        "color": "#f8f8f8"
    },
    "ErrorMsg": {
        "background-color": "#4040ff",
        "color": "inherit"
    },
    "Comment": {
        "background-color": "#ffffff",
        "color": "#236e25"
    },
    "Directory": {
        "background-color": "#eeeeee",
        "color": "inherit"
    },
    "StatusLineNC": {
        "background-color": "#75a0da",
        "color": "#ffffff"
    },
    "WildMenu": {
        "background-color": "#ff3030",
        "color": "#f8f8f8"
    },
    "Cursor": {
        "background-color": "#8040ff",
        "color": "inherit"
    },
    "Underlined": {
        "background-color": "#ffffff",
        "color": "inherit"
    },
    "Folded": {
        "background-color": "#fff0d0",
        "color": "#804030"
    },
    "Number": {
        "background-color": "#ffffff",
        "color": "#0000ff"
    },
    "StatusLine": {
        "background-color": "#4570aa",
        "color": "#ffffff"
    },
    "DiffAdd": {
        "background-color": "#e7e7ff",
        "color": "blue"
    },
    "FoldColumn": {
        "background-color": "#e7e7e7",
        "color": "#6b6b6b"
    },
    "NonText": {
        "background-color": "#ffffff",
        "color": "inherit"
    },
    "DiffChange": {
        "background-color": "#ffe7e7",
        "color": "black"
    },
    "CursorIM": {
        "background-color": "#8040ff",
        "color": "#ffffff"
    },
    "Title": {
        "background-color": "#ffc0a0",
        "color": "inherit"
    },
    "Constant": {
        "background-color": "#ffffff",
        "color": "#00884c"
    },
    "Special": {
        "background-color": "#ffffff",
        "color": "#8040f0"
    },
    "Identifier": {
        "background-color": "#ffffff",
        "color": "#b07800"
    },
    "ModeMsg": {
        "background-color": "#ffffff",
        "color": "inherit"
    },
    "Ignore": {
        "background-color": "#ffffff",
        "color": "#888888"
    },
    "PreProc": {
        "background-color": "#ffffff",
        "color": "#683821"
    },
    "Error": {
        "background-color": "#4040ff",
        "color": "#f8f8f8"
    },
    "Statement": {
        "background-color": "#ffffff",
        "color": "#b64f90"
    }
};


cc = colorCss;

cc['body'] = cc['Normal'];
cc['h1'] = cc['Error'];
cc['h2'] = cc['Question'];
cc['h3'] = cc['ModeMsg'];
cc['h4'] = cc['PreProc'];
cc['h5'] = cc['Title'];

cc['u'] = cc['Title'];
cc['b'] = cc['Error'];
cc['i'] = cc['Statement'];

module.exports = colorCss;
