import PythonShell from "python-shell";
import path from "path";

let options = {
    scriptPath: path.join(__dirname, "../analysis/"),
    args: ["value1", "value2", "value3"],
};

PythonShell.run("test.py", options, function (err, data) {
    if (err) throw err;
    console.log(data);
});
