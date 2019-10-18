const actions = require('./src/actions')

const $ = (process.argv.length > 1 && process.argv[2]) ? process.argv[2].replace(/^("|')(.*)("|')$/, '$1') : "";

/*const showLoading = () =>
        (function() {
  var h = ['|', '/', '-', '\\'];
  var i = 0;

  return setInterval(() => {
    i = (i > 3) ? 0 : i;
    console.clear();
    console.log(h[i]);
    i++;
  }, 300);
})()
*/
const ops = {
	'syn' : actions.syn,
	'ant' : actions.ant,
	'def' : actions.def,
	'exp' : actions.exp,
	'' : actions.WOD,
	'dict' : actions.dict
}

ops[$](process.argv[3])
