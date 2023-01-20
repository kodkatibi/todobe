module.exports = {
    "up": "CREATE TABLE users\n" +
        "(\n" +
        "    id        INTEGER      NOT NULL AUTO_INCREMENT,\n" +
        "    email     VARCHAR(191) NOT NULL,\n" +
        "    name      VARCHAR(191) NULL,\n" +
        "    password  VARCHAR(191) NOT NULL,\n" +
        "    token     VARCHAR(191) NULL,\n" +
        "    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP (3),\n" +
        "    updatedAt DATETIME(3) NOT NULL,\n" +
        "\n" +
        "    UNIQUE INDEX users_email_key(email),\n" +
        "    PRIMARY KEY (id)\n" +
        ") ",
    "down": "TRUNCATE TABLE  users"
}
