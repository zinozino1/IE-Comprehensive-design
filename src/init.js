import app from "./app";
import "./db";
import "./models/user";
import "./models/document";

const PORT = 4000;

const handleListening = () => {
    console.log(`✅ Listening on : http://52.78.80.31:${PORT}`);
};

app.listen(PORT, handleListening);
