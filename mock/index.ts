export default [{
    url: '/baseData',
    method: 'get',
    response: () => {
        return {
            code: 200,
            message:'success',
            "data|100000": [{
                string: '@string(10)',
                date: '@datetime("yyyy-MM-dd")',
                color: '@color()',
            }]
        }
    }
}]