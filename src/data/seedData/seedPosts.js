(function(seedPosts){
    seedPosts.initialPosts = [
        {
            id: 1,
            postTitle: "Object Reference",
            postContent: `A ob = new A();

Here 'ob' is referred to as object by most people. Or we refer to it as creating an instance of A.
But 'ob ' is actually object reference. And  that is the reason why we get "Object Reference not set to instance" message when we try to access any value from a null reference.
Reference is essentially the pointer in C++. Actual object is in heap and the reference which is located in Stack, points to the object located in heap.

Accessing any of the properties of the reference is called as dereferencing the reference.`,
            isaQuestion: false,
            tags: ["C#"],
            categoryName: "C#.NET"
        },
        {
            id: 2,
            postTitle: "Equality in C# DotNet ",
            postContent: `Equality can be either of reference equality or value equality.
Value Equality:
There is a virtual 'Equals' method defined in the 'Object' class. All other types inherit from this type and hence has the option to override this method. Value types usually override this method and implement their own equality logic as in the case of Int32.
Reference Equality:
Reference equality basically checks if 2 references point to the same instance or not.
A ob1 = new A();
A ob2 = new A();
ReferenceEquals(ob1, ob2) will return false.`,
            isaQuestion: true,
            tags: ["C#"],
            categoryName: "C#.NET"
        }                
    ];
})(module.exports);