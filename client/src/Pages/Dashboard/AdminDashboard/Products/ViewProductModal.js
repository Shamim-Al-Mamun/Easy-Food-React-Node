import React from "react";

const ViewProductModal = ({ product, showModal, setShowModal }) => {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-4xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col md:flex-row items-center justify-center w-full bg-white outline-none focus:outline-none py-5">
                {/*header*/}
                <div className="mx-auto basis-4/12">
                  <img
                    className="w-full mx-auto"
                    src={product.images[0]}
                    alt="food"
                  />
                </div>
                <div className="basis-8/12">
                  <div className="p-5 pb-0">
                    <h3 className="text-3xl font-semibold">{product.title}</h3>
                    <h3 className="text-xl mt-2">Price: ${product.price}</h3>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 pt-0 flex-auto">
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                      {product.description}
                    </p>
                    <h5 className="text-lg">Category: {product.category}</h5>

                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 rounded-b">
                    <button
                      className="primary text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg bg-primary_hover outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default ViewProductModal;
