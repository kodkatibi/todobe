module.exports = {
    "up": "CREATE TABLE todos(\n" +
        "    id        INTEGER      NOT NULL AUTO_INCREMENT,\n" +
        "    title     VARCHAR(191) NOT NULL,\n" +
        "    content   VARCHAR(191) NULL,\n" +
        "    userId    INTEGER NULL,\n" +
        "    isDone    BOOLEAN      NOT NULL DEFAULT false,\n" +
        "    doAt      DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP (3),\n" +
        "    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP (3),\n" +
        "    updatedAt DATETIME(3) NOT NULL,\n" +
        "\n" +
        "    PRIMARY KEY (id)\n" +
        ")",
    "down": "TRUNCATE TABLE  todos"
}
