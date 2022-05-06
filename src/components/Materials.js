import React from "react";

const Materials = (props) => {
  return (
    <section id="card">
      <div class="container">
        <div class="title">
          <h1>Builder's Bliss</h1>
          <p>
            “Each of us is carving a stone, erecting a column, or cutting a
            piece of stained glass in the construction of something much bigger
            than ourselves.” – Adrienne Clarkson
          </p>
        </div>
        <div class="row">
          {props.materials.map((material) => (
            <div class="col-md-4">
              <div class="jj" key={material.index}>
                <div class="card text-center">
                  <img
                    class="card-img-top"
                    src={material.image}
                    alt=" img top"
                  />
                  <div class="card-body">
                    <h5 class="card-name">{material.name}</h5>
                    <p class="card-quantity">Quantity:{material.quantity}</p>
                    <p className="card-text">
                      <small>
                        {material.forSale
                          ? "Available for sale"
                          : "Not Available for sale"}
                      </small>
                    </p>
                    <p class="card-location">Location:{material.location}</p>
                    <p class="card-price">
                      {material.price / 1000000000000000000}cUSD
                    </p>
                    {/* Make this button visible to other users apart from the owner (only when it's available for sale) */}
                    {props.owner !== material.creator && material.forSale && (
                      <button
                        type="button"
                        class="btn btn-outline-dark"
                        onClick={() => props.buyMaterial(material.index)}
                      >
                        Buy Material
                      </button>
                    )}

                    {/* // Make button visible to only the creator  */}
                    {props.owner === material.creator && (
                      <button
                        className="btn btn-dark"
                        onClick={() => props.SwitchForsale(material.index)}
                      >
                        {material.forSale
                          ? "Make Not For Sale"
                          : "Make for sale"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          ;
        </div>
      </div>
    </section>
  );
};

export default Materials;
