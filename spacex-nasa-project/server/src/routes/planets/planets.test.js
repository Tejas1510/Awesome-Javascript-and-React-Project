const request = require('supertest')
const app = require('../../app')
const {mongoConnect, mongoDisconnect} = require('../../services/mongo')

describe('Launches Planet API', () => {

    beforeAll(async () => {
        await mongoConnect();
    })
    afterAll(async() => {
        await mongoDisconnect();
    })

    describe('Test GET /launches', () => {
        test('It Should respond with 200 success', async () => {
            const response = await request(app)
                .get('/v1/planets')
                .expect('Content-Type', /json/)
                .expect(200)
        })
    })
})
