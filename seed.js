const { MongoClient } = require('mongodb');
const { faker } = require('@faker-js/faker');

// Hàm loại bỏ dấu tiếng Việt
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

function generateLongText(minWords = 1000, maxWords = 1500) {
    const wordCount = faker.datatype.number({ min: minWords, max: maxWords });
    return faker.lorem.words(wordCount);
}
async function seedData() {
    const uri = "mongodb://localhost:27017"; 
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('DocProfileDB');
        const collection = database.collection('DocProfiles');

        // await collection.deleteMany({});

        const records = Array.from({ length: 1500 }, () => {
            const fullText = generateLongText(1000, 1500);
            return {
                docId: faker.datatype.uuid(),
                docSoHieu: faker.random.alphaNumeric(12).toUpperCase(),
                docMaVB: faker.random.alphaNumeric(12),
                docTenVB: faker.commerce.productName(),
                docCapPD: faker.name.jobTitle(),
                docDonViSoan: faker.company.name(),
                docNguoiKy: faker.name.fullName(),
                docNgayHieuLuc: faker.date.past(),
                docQuyenTruyCap: faker.helpers.randomize(['Y', 'N']),
                docPath: faker.system.filePath(),
                docCategoryId: faker.datatype.uuid(),
                docFullText: fullText,
                docFullTextRM: removeAccent(fullText),
                docDown: faker.datatype.number({ min: 0, max: 500 }),
                docPrint: faker.datatype.number({ min: 0, max: 500 }),
                docView: faker.datatype.number({ min: 0, max: 5000 }),
                docStatus: faker.helpers.randomize([-1, 0, 1, 2]),
                docInitBy: faker.internet.userName(),
                docInitTime: faker.date.past(),
                docAuthBy: faker.internet.userName(),
                docAuthTime: faker.date.recent(),
                docIsAuth: faker.datatype.number({ min: 0, max: 1 }),
                docVersion: faker.system.semver(),
                docOriginal: faker.datatype.number({ min: 0, max: 1 }),
                docQA: faker.commerce.department(),
                docIsShow: faker.helpers.randomize(['Y', 'N']),
                docNgayHetHieuLuc: faker.date.future(),
                docParent: faker.datatype.uuid(),
                docLinkVBThayThe: faker.internet.url(),
                docVBSuaDoiId: faker.datatype.uuid(),
                docLinkVBSuaDoi: faker.internet.url(),
                docVBHopNhatId: faker.datatype.uuid(),
                docLinkVBHopNhat: faker.internet.url(),
                docNoiGuiNhan: faker.address.fullAddress(),
                docNgayBanHanh: faker.date.past(),
                docKinhChuyen: faker.lorem.sentence(),
                docIsClose: faker.datatype.number({ min: 0, max: 1 }),
                docHoTenNgKy: faker.name.fullName(),
                docPath_QA: faker.system.filePath(),
                docFullText_QA: faker.lorem.paragraphs(5),
                docUpdateTime: faker.date.recent(),
                docCatList: faker.helpers.arrayElement(faker.commerce.categories(5)),
                docAddress: faker.address.fullAddress(),
                docDeleteAt: faker.datatype.boolean() ? faker.date.soon() : null,
            };
        });
        await collection.insertMany(records);

        console.log('OK');
    } catch (err) {
        console.error('loi', err);
    } finally {
        await client.close();
    }
}

seedData();
