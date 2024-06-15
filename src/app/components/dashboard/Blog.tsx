import img1 from "../../../assets/images/projectimg1.jpg";

const Blog = () => {
  return (
    <div
      style={{ maxWidth: "1200px", left: "50%", transform: "translateX(-50%)" }}
      className="position-relative"
    >
      <p className="h4 py-2 mt-3 text-secondary">Projects</p>
      <div className="blog">
        <div className="card bg-dark text-white">
          <img src={img1} className="card-img" alt="..." />
          <div className="card-img-overlay">
                <div className="position-absolute bottom-0">
                    <div >Sketch</div>
                    <div>Merge Duplicates Inconsistent Symbols</div>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
