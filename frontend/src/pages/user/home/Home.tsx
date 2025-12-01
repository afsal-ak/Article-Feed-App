const Home = () => {
  return (
    <>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">Welcome to Article Feed App</h2>
          <p className="text-lg text-gray-600 mb-4">
            Explore a world of articles written by passionate writers on topics you love. From
            travel and lifestyle to technology and current events, find content that inspires,
            informs, and entertains.
          </p>
          <p className="text-lg text-gray-600 mb-8">
            Share your own thoughts, create articles, and connect with a community of readers and
            writers. Stay updated, learn new perspectives, and express yourself!
          </p>

          {/* <div className="flex justify-center gap-4">
            <Link to="/login">
              <Button className="bg-orange hover:bg-orange-dark text-white px-6 py-2 rounded">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" className="border-orange text-orange px-6 py-2 rounded hover:bg-orange hover:text-white">
                Sign Up
              </Button>
            </Link>
          </div> */}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-semibold text-foreground mb-6">Why Use Article Feed?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow">
              <h4 className="text-xl font-semibold mb-2">Read & Learn</h4>
              <p className="text-gray-600">
                Access articles on a wide range of topics and expand your knowledge every day.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <h4 className="text-xl font-semibold mb-2">Share Your Voice</h4>
              <p className="text-gray-600">
                Write and publish your own articles to share ideas and connect with readers.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <h4 className="text-xl font-semibold mb-2">Join the Community</h4>
              <p className="text-gray-600">
                Engage with like-minded people, comment, like, and follow favorite authors.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

//    const Home = () => {

//   return (
//     <>

//       <section className="py-16 bg-background">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold text-foreground mb-4">
//               Article Feed App <span className="text-orange"></span>
//             </h2>

//           </div>

//         </div>
//       </section>
//     </>
//   );
// };

// export default Home;
