(this["webpackJsonpsilorust-client"]=this["webpackJsonpsilorust-client"]||[]).push([[230,152],{1128:function(e,t,a){"use strict";var n=a(860);function r(e){e.register(n),function(e){var t=/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,a=/\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b|\b0x[\dA-F]+\b/;e.languages.soy={comment:[/\/\*[\s\S]*?\*\//,{pattern:/(\s)\/\/.*/,lookbehind:!0,greedy:!0}],"command-arg":{pattern:/(\{+\/?\s*(?:alias|call|delcall|delpackage|deltemplate|namespace|template)\s+)\.?[\w.]+/,lookbehind:!0,alias:"string",inside:{punctuation:/\./}},parameter:{pattern:/(\{+\/?\s*@?param\??\s+)\.?[\w.]+/,lookbehind:!0,alias:"variable"},keyword:[{pattern:/(\{+\/?[^\S\r\n]*)(?:\\[nrt]|alias|call|case|css|default|delcall|delpackage|deltemplate|else(?:if)?|fallbackmsg|for(?:each)?|if(?:empty)?|lb|let|literal|msg|namespace|nil|@?param\??|rb|sp|switch|template|xid)/,lookbehind:!0},/\b(?:any|as|attributes|bool|css|float|html|in|int|js|list|map|null|number|string|uri)\b/],delimiter:{pattern:/^\{+\/?|\/?\}+$/,alias:"punctuation"},property:/\w+(?==)/,variable:{pattern:/\$[^\W\d]\w*(?:\??(?:\.\w+|\[[^\]]+\]))*/,inside:{string:{pattern:t,greedy:!0},number:a,punctuation:/[\[\].?]/}},string:{pattern:t,greedy:!0},function:[/\w+(?=\()/,{pattern:/(\|[^\S\r\n]*)\w+/,lookbehind:!0}],boolean:/\b(?:false|true)\b/,number:a,operator:/\?:?|<=?|>=?|==?|!=|[+*/%-]|\b(?:and|not|or)\b/,punctuation:/[{}()\[\]|.,:]/},e.hooks.add("before-tokenize",(function(t){var a=!1;e.languages["markup-templating"].buildPlaceholders(t,"soy",/\{\{.+?\}\}|\{.+?\}|\s\/\/.*|\/\*[\s\S]*?\*\//g,(function(e){return"{/literal}"===e&&(a=!1),!a&&("{literal}"===e&&(a=!0),!0)}))})),e.hooks.add("after-tokenize",(function(t){e.languages["markup-templating"].tokenizePlaceholders(t,"soy")}))}(e)}e.exports=r,r.displayName="soy",r.aliases=[]},860:function(e,t,a){"use strict";function n(e){!function(e){function t(e,t){return"___"+e.toUpperCase()+t+"___"}Object.defineProperties(e.languages["markup-templating"]={},{buildPlaceholders:{value:function(a,n,r,i){if(a.language===n){var l=a.tokenStack=[];a.code=a.code.replace(r,(function(e){if("function"===typeof i&&!i(e))return e;for(var r,o=l.length;-1!==a.code.indexOf(r=t(n,o));)++o;return l[o]=e,r})),a.grammar=e.languages.markup}}},tokenizePlaceholders:{value:function(a,n){if(a.language===n&&a.tokenStack){a.grammar=e.languages[n];var r=0,i=Object.keys(a.tokenStack);!function l(o){for(var s=0;s<o.length&&!(r>=i.length);s++){var p=o[s];if("string"===typeof p||p.content&&"string"===typeof p.content){var c=i[r],u=a.tokenStack[c],g="string"===typeof p?p:p.content,d=t(n,c),f=g.indexOf(d);if(f>-1){++r;var m=g.substring(0,f),b=new e.Token(n,e.tokenize(u,a.grammar),"language-"+n,u),k=g.substring(f+d.length),h=[];m&&h.push.apply(h,l([m])),h.push(b),k&&h.push.apply(h,l([k])),"string"===typeof p?o.splice.apply(o,[s,1].concat(h)):p.content=h}}else p.content&&l(p.content)}return o}(a.tokens)}}}})}(e)}e.exports=n,n.displayName="markupTemplating",n.aliases=[]}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_soy.abe799e1.chunk.js.map