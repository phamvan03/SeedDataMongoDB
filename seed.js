const { MongoClient } = require('mongodb');
const { faker } = require('@faker-js/faker'); 
const { v4: uuidv4 } = require('uuid');
const uri = "mongodb://localhost:27017";
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

    // Sử dụng faker.lorem.sentence để tạo ra các câu
    // Chúng ta sẽ tạo nhiều câu cho đến khi đạt được độ dài mong muốn
    while (wordCount < 1000) {
        let sentence = faker.lorem.sentence();
        wordCount += sentence.split(' ').length; // Đếm số lượng từ trong câu
        text += sentence + ' ';
    }

    // Nếu văn bản ngắn hơn 1000 chữ, chúng ta tiếp tục thêm văn bản
    while (wordCount < 1500) {
        let sentence = faker.lorem.sentence();
        wordCount += sentence.split(' ').length;
        text += sentence + ' ';
    }

    return text.trim(); // Trả về văn bản đã được tạo
}
async function seedData() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('ok.');

        const db = client.db("DocProfileDB"); 
        const collection = db.collection("DocProfiles");
        const docs = Array.from({ length: 1500 }, () => {
            const fullText = generateLongText(1000, 1500);
            return {
                docId: uuidv4(),
                docSoHieu: faker.string.alphanumeric(12),
                docMaVB: faker.string.alphanumeric(12),
                docTenVB: faker.commerce.productName(),
                docCapPD: faker.person.jobTitle(),
                docDonViSoan: faker.company.name(),
                docNguoiKy: faker.person.fullName(),
                docNgayHieuLuc: faker.date.past(),
                docQuyenTruyCap: faker.helpers.arrayElement(['Y', 'N']),
                docPath: faker.system.filePath(),
                docCategoryId: uuidv4(),
                docFullText: fullText,
                docFullTextRM: removeAccent(fullText),
                docDown:  faker.number.int({ min: 0, max: 100 }),
                docPrint:  faker.number.int({ min: 0, max: 100 }),
                docView:  faker.number.int({ min: 0, max: 1000 }), 
                docStatus: faker.number.int({ min: -1, max: 2 }),
                docInitBy: faker.internet.userName(),
            docInitTime: faker.date.recent(),
            docAuthBy: faker.internet.userName(),
            docAuthTime: faker.date.recent(),
            docIsAuth: faker.number.int({ min: 0, max: 1 }),
            docVersion: faker.system.semver(),
            docOriginal: faker.number.int({ min: 0, max: 1 }),
            docQA: faker.word.adjective(),
            docIsShow: faker.helpers.arrayElement(['Y', 'N']),
            docNgayHetHieuLuc: faker.date.future(),
            docParent: uuidv4(),
            docLinkVBThayThe: faker.internet.url(),
            docVBSuaDoiId: uuidv4(),
            docLinkVBSuaDoi: faker.internet.url(),
            docVBHopNhatId: uuidv4(),
            docLinkVBHopNhat: faker.internet.url(),
            docNoiGuiNhan: faker.address.streetAddress(),
            docNgayBanHanh: faker.date.past(),
            docKinhChuyen: faker.lorem.sentence(),
            docIsClose: faker.number.int({ min: 0, max: 1 }),
            docHoTenNgKy: faker.person.fullName(),
            docPath_QA: `/documents/qa-${faker.system.fileName()}`,
            docFullText_QA: faker.lorem.text(),
            docUpdateTime: faker.date.recent(),
            docCatList: faker.word.adjective(),
            docAddress: faker.address.streetAddress(),
            docDeleteAt: null,
            };
        });
        const result = await collection.insertMany(docs);

        console.log('OK');
    } catch (err) {
        console.error('loi', err);
    } finally {
        await client.close();
    }
}

seedData();
