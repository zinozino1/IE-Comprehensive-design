import app from "./app";
import "./db";
import "./models/user";
import "./models/document";

const PORT = 4000;

const handleListening = () => {
    console.log(`✅ Listening on : http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
