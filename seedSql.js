const sql = require('mssql');
const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');

// SQL Server connection config
const config = {
    user: 'sa',
    password: '123456',
    server: 'DESKTOP-7CQKFEU//MSSQLSERVER01',
    database: 'seedData',
    options: {
        encrypt: false, // Set to true if using Azure SQL
        trustServerCertificate: true,
        enableArithAbort: true,
    },
};

function removeAccent(input) {
    input = input.replace(/á|à|ã|ả|ạ|â|ấ|ầ|ẫ|ẩ|ậ|ă|ắ|ằ|ẵ|ặ|ẳ/g, "a");
    input = input.replace(/Á|À|Ã|Ả|Ạ|Â|Ấ|Ầ|Ẫ|Ẩ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ|Ẳ/g, "A");
    input = input.replace(/é|è|ẽ|ẹ|ẻ|ê|ế|ề|ể|ễ|ệ/g, "e");
    input = input.replace(/É|È|Ẽ|Ẹ|Ẻ|Ê|Ế|Ề|Ể|Ễ|Ệ/g, "E");
    input = input.replace(/í|ì|ĩ|ị|ỉ/g, "i");
    input = input.replace(/Í|Ì|Ĩ|Ị|Ỉ/g, "I");
    input = input.replace(/ó|ò|õ|ọ|ỏ|ô|ố|ồ|ỗ|ộ|ổ|ơ|ớ|ờ|ỡ|ợ|ở/g, "o");
    input = input.replace(/Ó|Ò|Õ|Ọ|Ỏ|Ô|Ố|Ồ|Ỗ|Ộ|Ổ|Ơ|Ớ|Ờ|Ỡ|Ợ|Ở/g, "O");
    input = input.replace(/ú|ù|ũ|ụ|ủ|ư|ứ|ừ|ữ|ự|ử/g, "u");
    input = input.replace(/Ú|Ù|Ũ|Ụ|Ủ|Ư|Ứ|Ừ|Ữ|Ự|Ử/g, "U");
    input = input.replace(/ý|ỳ|ỹ|ỷ|ỵ/g, "y");
    input = input.replace(/Ý|Ỳ|Ỹ|Ỷ|Ỵ/g, "Y");
    input = input.replace(/Đ/g, "D");
    input = input.replace(/đ/g, "d");
    return input;
}

function generateLongText() {
    let text = '';
    let wordCount = 0;
    while (wordCount < 1000) {
        let sentence = faker.lorem.sentence();
        wordCount += sentence.split(' ').length;
        text += sentence + ' ';
    }
    while (wordCount < 1500) {
        let sentence = faker.lorem.sentence();
        wordCount += sentence.split(' ').length;
        text += sentence + ' ';
    }
    return text.trim();
}

async function seedData() {
    try {
        const pool = await sql.connect(config);
        
        for (let i = 0; i < 1500; i++) {
            const fullText = generateLongText();

            await pool.request()
                .input('docId', sql.NVarChar, uuidv4())
                .input('docSoHieu', sql.NVarChar, faker.string.alphanumeric(12))
                .input('docMaVB', sql.NVarChar, faker.string.alphanumeric(12))
                .input('docTenVB', sql.NVarChar, faker.commerce.productName())
                .input('docCapPD', sql.NVarChar, faker.person.jobTitle())
                .input('docDonViSoan', sql.NVarChar, faker.company.name())
                .input('docNguoiKy', sql.NVarChar, faker.person.fullName())
                .input('docNgayHieuLuc', sql.DateTime, faker.date.past())
                .input('docQuyenTruyCap', sql.Char, faker.helpers.arrayElement(['Y', 'N']))
                .input('docPath', sql.NVarChar, faker.system.filePath())
                .input('docCategoryId', sql.NVarChar, uuidv4())
                .input('docFullText', sql.NVarChar, fullText)
                .input('docFullTextRM', sql.NVarChar, removeAccent(fullText))
                .input('docDown', sql.Int, faker.number.int({ min: 0, max: 100 }))
                .input('docPrint', sql.Int, faker.number.int({ min: 0, max: 100 }))
                .input('docView', sql.Int, faker.number.int({ min: 0, max: 1000 }))
                .input('docStatus', sql.Int, faker.number.int({ min: -1, max: 2 }))
                .input('docInitBy', sql.NVarChar, faker.internet.userName())
                .input('docInitTime', sql.DateTime, faker.date.recent())
                .input('docAuthBy', sql.NVarChar, faker.internet.userName())
                .input('docAuthTime', sql.DateTime, faker.date.recent())
                .input('docIsAuth', sql.Int, faker.number.int({ min: 0, max: 1 }))
                .input('docVersion', sql.NVarChar, faker.system.semver())
                .input('docOriginal', sql.Int, faker.number.int({ min: 0, max: 1 }))
                .input('docQA', sql.NVarChar, faker.word.adjective())
                .input('docIsShow', sql.Char, faker.helpers.arrayElement(['Y', 'N']))
                .input('docNgayHetHieuLuc', sql.DateTime, faker.date.future())
                .input('docParent', sql.NVarChar, uuidv4())
                .input('docLinkVBThayThe', sql.NVarChar, faker.internet.url())
                .input('docVBSuaDoiId', sql.NVarChar, uuidv4())
                .input('docLinkVBSuaDoi', sql.NVarChar, faker.internet.url())
                .input('docVBHopNhatId', sql.NVarChar, uuidv4())
                .input('docLinkVBHopNhat', sql.NVarChar, faker.internet.url())
                .input('docNoiGuiNhan', sql.NVarChar, faker.address.streetAddress())
                .input('docNgayBanHanh', sql.DateTime, faker.date.past())
                .input('docKinhChuyen', sql.NVarChar, faker.lorem.sentence())
                .input('docIsClose', sql.Int, faker.number.int({ min: 0, max: 1 }))
                .input('docHoTenNgKy', sql.NVarChar, faker.person.fullName())
                .input('docPath_QA', sql.NVarChar, `/documents/qa-${faker.system.fileName()}`)
                .input('docFullText_QA', sql.NVarChar, faker.lorem.text())
                .input('docUpdateTime', sql.DateTime, faker.date.recent())
                .input('docCatList', sql.NVarChar, faker.word.adjective())
                .input('docAddress', sql.NVarChar, faker.address.streetAddress())
                .input('docDeleteAt', sql.DateTime, null)
                .query(`INSERT INTO DocProfiles (
                    docId, docSoHieu, docMaVB, docTenVB, docCapPD, docDonViSoan, docNguoiKy, docNgayHieuLuc,
                    docQuyenTruyCap, docPath, docCategoryId, docFullText, docFullTextRM, docDown, docPrint, docView,
                    docStatus, docInitBy, docInitTime, docAuthBy, docAuthTime, docIsAuth, docVersion, docOriginal,
                    docQA, docIsShow, docNgayHetHieuLuc, docParent, docLinkVBThayThe, docVBSuaDoiId, docLinkVBSuaDoi,
                    docVBHopNhatId, docLinkVBHopNhat, docNoiGuiNhan, docNgayBanHanh, docKinhChuyen, docIsClose,
                    docHoTenNgKy, docPath_QA, docFullText_QA, docUpdateTime, docCatList, docAddress, docDeleteAt
                ) VALUES (
                    @docId, @docSoHieu, @docMaVB, @docTenVB, @docCapPD, @docDonViSoan, @docNguoiKy, @docNgayHieuLuc,
                    @docQuyenTruyCap, @docPath, @docCategoryId, @docFullText, @docFullTextRM, @docDown, @docPrint, @docView,
                    @docStatus, @docInitBy, @docInitTime, @docAuthBy, @docAuthTime, @docIsAuth, @docVersion, @docOriginal,
                    @docQA, @docIsShow, @docNgayHetHieuLuc, @docParent, @docLinkVBThayThe, @docVBSuaDoiId, @docLinkVBSuaDoi,
                    @docVBHopNhatId, @docLinkVBHopNhat, @docNoiGuiNhan, @docNgayBanHanh, @docKinhChuyen, @docIsClose,
                    @docHoTenNgKy, @docPath_QA, @docFullText_QA, @docUpdateTime, @docCatList, @docAddress, @docDeleteAt
                )`);
        }

        console.log('Data seeding completed.');
    } catch (err) {
        console.error('Error seeding data:', err);
    } finally {
        sql.close();
    }
}

seedData();
