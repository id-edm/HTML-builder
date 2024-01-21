const fs = require('fs').promises;
const path = require('path');

const folder = path.join(__dirname, 'files');
const newFolder = path.join(__dirname, 'files-copy');

async function copyFiles() {
    try {
        await fs.mkdir(newFolder, { recursive: true }); // cоздаем целевую папку, используя fs.mkdir с опцией recursive: true.

        const files = await fs.readdir(folder); // получаем список файлов в исходной папке с помощью fs.readdir.
        // копирование файлов
        for (const file of files) {
            const sourcePath = path.join(folder, file);
            const destPath = path.join(newFolder, file);
            await fs.copyFile(sourcePath, destPath);
        }
        // проверка и удаление лишних файлов в целевой папке
        const newFiles = await fs.readdir(newFolder);
        for (const file of newFiles) {
            try {
                // проверка существования файла в исходной папке
                await fs.access(path.join(folder, file));
            } catch (error) {
                console.log("Файла не существует в исходной папке:", file);
                await fs.unlink(path.join(newFolder, file)); // удаляем файл из целевой папки с помощью fs.unlink.
                console.log('Удаляем его.');
            }
        }

        console.log('Все файлы были успешно скопированы');
    } catch (err) {
        console.error(err);
    }
}

copyFiles();