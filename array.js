

// check if one object  of an array exists  in another bunch of array of ojbect 



const allUser = [

    {
        id: '123',
        username: "santosh",
    },
    {

        id: "234",
        username: "rajesh"
    }, {

        id: "456",
        username: "anil doe"
    }

]

const friends = [
    {
        id: '123',
        username: "santosh",
    },
    {
        id: "678",
        username: "mahesh"
    }
]


const filteredUser = allUser.filter(allUser => {
    if (friends.findIndex(frnd => frnd.id == allUser.id) !== -1) {
        return true
    }
})



//count the number of words it is repeated and return the array of object [ <wordname>:<number of count>]



const wordCheck = ["test", "jump", "run"]

const worldList = ["test", "test", "run", "test", "run", "hop", "cry", "love", 'test', 'run', "jump"]

const countWords = (words, compare) => {




    return finalCount = words.map((word) => {
        console.log("inside the map")
        return compare.reduce((acc, val) => {
            word.toLowerCase() === val.toLowerCase() && acc[word]++
            console.log("inside teh reducer")
            return acc
        }, { [word]: 0 })




    })

}

console.log(countWords(wordCheck, worldList))