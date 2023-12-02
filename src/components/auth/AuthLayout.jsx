import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <video autoPlay loop muted id="video">
            <source src={"/assets/blob12.mp4"} type="video/mp4" />
          </video>

          <section className="bg-transparent hover:bg-[#ddd9ed]  shadow-xl flex  justify-center items-center rounded-xl flex-col px-8 py-6 mx-auto h-fit my-auto w-3/4 max-w-xl">
            <Outlet />
          </section>
        </>
      )}
    </>
  );
};

export default AuthLayout;