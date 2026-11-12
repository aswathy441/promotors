
const readline = require("node:readline/promises");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let connection;

  try {
    const name = await rl.question("Admin name: ");
    const email = await rl.question("Admin email: ");
    const password = await rl.question("Admin password: ");

    if (!name.trim() || !email.trim() || password.length < 12) {
      throw new Error("Enter a name, email and password of at least 12 characters.");
    }

    const passwordHash = await bcrypt.hash(password, 12);

    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "promotors_db",
    });

    await connection.execute(
      "INSERT INTO admin_users (name, email, password_hash) VALUES (?, ?, ?)",
      [name.trim(), email.trim(), passwordHash]
    );

    console.log("Admin account created successfully!");
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    if (connection) await connection.end();
    rl.close();
  }
}

main();
