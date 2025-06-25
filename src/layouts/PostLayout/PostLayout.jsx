import './PostLayout.css';

const PostLayout = () => {
  return (
    <>
      <div className="container">
        <div className="containerUserPost">
          <div className="containerPost">
            <div className="contianerUser">
              <div className="userAvatar"></div>
              <h3 className="userName">Alex Carter</h3>
            </div>
            <div className="datePost">23 January 2025</div>
          </div>
          <h1>The Ultimate Guide to Full-Body Workouts</h1>
          <div className="line"></div>
          <div className="containerText">
            <p>
              Discover exercises that target every muscle group, helping you
              build strength and endurance. Perfect for beginners and seasoned
              gym-goers alike.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus
            </p>
            <p>
              mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
              quis, sem. Nulla consequat massa quis enim.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus
            </p>
            <div className="line"></div>
            <cite className="citeText">
              With over a decade of experience in the fitness industry, Alex
              specializes in strength training and functional fitness. Certified
              by NASM and known for his motivational style, Alex designs workout
              programs that are both challenging and achievable. His passion
              lies in helping clients build strength and confidence through
              personalized training routines. Outside the gym, Alex is an avid
              runner and enjoys outdoor adventures.
            </cite>
            <div className="line"></div>
            <p>
              With over a decade of experience in the fitness industry, Alex
              specializes in strength training and functional fitness. Certified
              by NASM and known for his motivational style, Alex designs workout
              programs that are both challenging and achievable. His passion
              lies in helping clients build strength and confidence through
              personalized training routines. Outside the gym, Alex is an avid
              runner and enjoys outdoor adventures.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
              sem. Nulla consequat massa quis enim. Lorem ipsum dolor sit amet,
              consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
              Aenean massa. Cum sociis natoque penatibus et magnis dis
              parturient montes, nascetur ridiculus
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus
            </p>
            <p>
              mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
              quis, sem. Nulla consequat massa quis enim.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus
            </p>
            <div className="line"></div>
            <div className="containerAboutUser">
              <div className="aboutUser">About Alex Carter</div>
              <div className="userAvatar AvatarBig"></div>
              <cite className="citeText">
                With over a decade of experience in the fitness industry, Alex
                specializes in strength training and functional fitness.
                Certified by NASM and known for his motivational style, Alex
                designs workout programs that are both challenging and
                achievable. His passion lies in helping clients build strength
                and confidence through personalized training routines. Outside
                the gym, Alex is an avid runner and enjoys outdoor adventures.
              </cite>
              <div className="line"></div>
              <div className="slider">
                <div className="buttonContainer">
                  <button>
                    <span className="rightIconPrevious">←</span> Previous{' '}
                  </button>
                  <button>
                    Next <span className="leftIconPrevious">→</span>
                  </button>
                </div>
                <div className="textContainer">
                  <p>5 Tips for Better Cardio Sessions</p>
                  <p>Meal Prep Basics for Gym Enthusiasts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="related">
        <div className="containerArticles">
          <h3>Related articles</h3>
          <div className="containerCard">
            <div className="card">
              <div className="imageArticles"></div>
              <p className="textArticies">
                The Ultimate Guide to Full-Body Workouts
              </p>
              <p className="otherText">
                Discover exercises that target every muscle group, helping you
                build strength and endurance. Perfect for beginners and seasoned
                gym-goers alike.
              </p>
              <p className="author">By Alex Carter</p>
            </div>
            <div className="card">
              <div className="imageArticles"></div>
              <p className="textArticies">
                The Ultimate Guide to Full-Body Workouts
              </p>
              <p className="otherText">
                Discover exercises that target every muscle group, helping you
                build strength and endurance. Perfect for beginners and seasoned
                gym-goers alike.
              </p>
              <p className="author">By Alex Carter</p>
            </div>
            <div className="card">
              <div className="imageArticles"></div>
              <p className="textArticies">
                The Ultimate Guide to Full-Body Workouts
              </p>
              <p className="otherText">
                Discover exercises that target every muscle group, helping you
                build strength and endurance. Perfect for beginners and seasoned
                gym-goers alike.
              </p>
              <p className="author">By Alex Carter</p>
            </div>
            <div className="card">
              <div className="imageArticles"></div>
              <p className="textArticies">
                The Ultimate Guide to Full-Body Workouts
              </p>
              <p className="otherText">
                Discover exercises that target every muscle group, helping you
                build strength and endurance. Perfect for beginners and seasoned
                gym-goers alike.
              </p>
              <p className="author">By Alex Carter</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostLayout;
