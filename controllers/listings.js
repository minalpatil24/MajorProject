// const Listing = require("../models/listing.js");

// // -------------------- INDEX --------------------
// module.exports.index = async (req, res) => {
//   try {
//     const listings = await Listing.find({});
//     res.render("listings/index.ejs", { listings });
//   } catch (err) {
//     req.flash("error", "Failed to load listings");
//     res.redirect("/");
//   }
// };

// // -------------------- RENDER NEW FORM --------------------
// module.exports.renderNewForm = (req, res) => {
//   res.render("listings/new.ejs");
// };

// // -------------------- CREATE NEW LISTING --------------------
// module.exports.createListing = async (req, res, next) => {
//   try {
//     if (!req.user) {
//       req.flash("error", "You must be logged in to create a listing.");
//       return res.redirect("/login");
//     }

//     const newListing = new Listing(req.body.listing);

//     if (req.file) {
//       newListing.image = {
//         url: req.file.path,
//         filename: req.file.filename,
//       };
//     }

//     newListing.owner = req.user._id;

//     await newListing.save();
//     req.flash("success", "Successfully created a new listing!");
//     res.redirect(`/listings/${newListing._id}`);
//   } catch (err) {
//     console.error("Error creating listing:", err);
//     req.flash("error", "Failed to create listing.");
//     res.redirect("/listings/new");
//   }
// };

// // -------------------- SHOW LISTING --------------------
// module.exports.showListing = async (req, res) => {
//   try {
//     const listing = await Listing.findById(req.params.id)
//       .populate("owner")
//       .populate({
//         path: "reviews",
//         populate: { path: "author" },
//       });

//     if (!listing) {
//       req.flash("error", "Listing not found");
//       return res.redirect("/listings");
//     }

//     res.render("listings/show.ejs", { listing });
//   } catch (err) {
//     req.flash("error", "Failed to load listing");
//     res.redirect("/listings");
//   }
// };

// // -------------------- EDIT FORM --------------------
// // module.exports.renderEditForm = async (req, res) => {
// //   try {
// //     const listing = await Listing.findById(req.params.id);
// //     if (!listing) {
// //       req.flash("error", "Listing not found");
// //       return res.redirect("/listings");
// //     }
// //     res.render("listings/edit.ejs", { listing });
// //   } catch (err) {
// //     req.flash("error", "Failed to load edit form");
// //     res.redirect("/listings");
// //   }
// // };

// // -------------------- EDIT FORM --------------------
// module.exports.renderEditForm = async (req, res) => {
//   let { id } = req.params;
//     const listing = await Listing.findById(id);
//     if (!listing) {
//       req.flash("error", "Listing not found");
//       res.redirect("/listings");
//     }

//     let originalImageUrl = listing.image.url;
//     originalImageUrl = originalImageUrl.replace("/uploads/h_300,w_250");
//     res.render("listings/edit.ejs", { listing,originalImageUrl });
//   };

// //     res.render("listings/edit.ejs", {
// //       listing,
// //       originalImageUrl: listing.image ? listing.image.url : null // ✅ safely pass this
// //     });
// //   } catch (err) {
// //     req.flash("error", "Failed to load edit form");
// //     res.redirect("/listings");
// //   }
// // };


// // -------------------- UPDATE --------------------
// module.exports.updateListing = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

//     if (req.file) {
//       listing.image = {
//         url: req.file.path,
//         filename: req.file.filename,
//       };
//     }

//     await listing.save();
//     req.flash("success", "Successfully updated listing!");
//     res.redirect(`/listings/${listing._id}`);
//   } catch (err) {
//     req.flash("error", "Failed to update listing");
//     res.redirect("/listings");
//   }
// };

// // -------------------- DELETE --------------------
// module.exports.destroyListing = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Listing.findByIdAndDelete(id);
//     req.flash("success", "Listing deleted successfully!");
//     res.redirect("/listings");
//   } catch (err) {
//     req.flash("error", "Failed to delete listing");
//     res.redirect("/listings");
//   }
// };

const Listing = require("../models/listing.js");

// -------------------- INDEX --------------------
module.exports.index = async (req, res) => {
  try {
    const listings = await Listing.find({});
    res.render("listings/index.ejs", { listings });
  } catch (err) {
    req.flash("error", "Failed to load listings");
    res.redirect("/");
  }
};

// -------------------- RENDER NEW FORM --------------------
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// -------------------- CREATE NEW LISTING --------------------
module.exports.createListing = async (req, res, next) => {
  try {
    if (!req.user) {
      req.flash("error", "You must be logged in to create a listing.");
      return res.redirect("/login");
    }

    const newListing = new Listing(req.body.listing);

    if (req.file) {
      newListing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    newListing.owner = req.user._id;

    await newListing.save();
    req.flash("success", "Successfully created a new listing!");
    res.redirect(`/listings/${newListing._id}`);
  } catch (err) {
    console.error("Error creating listing:", err);
    req.flash("error", "Failed to create listing.");
    res.redirect("/listings/new");
  }
};

// -------------------- SHOW LISTING --------------------
module.exports.showListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate("owner")
      .populate({
        path: "reviews",
        populate: { path: "author" },
      });

    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });
  } catch (err) {
    req.flash("error", "Failed to load listing");
    res.redirect("/listings");
  }
};

// -------------------- EDIT FORM --------------------
module.exports.renderEditForm = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }

    // ✅ Apply Cloudinary transformation for small preview on edit page
    let originalImageUrl = listing.image.url;
    if (originalImageUrl) {
      originalImageUrl = originalImageUrl.replace(
        "/upload",
        "/upload/w_250,h_200,c_fill"
      );
    }

    res.render("listings/edit.ejs", { listing, originalImageUrl });
  } catch (err) {
    console.error("Error loading edit form:", err);
    req.flash("error", "Failed to load edit form");
    res.redirect("/listings");
  }
};

// -------------------- UPDATE LISTING --------------------
module.exports.updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (req.file) {
      listing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    await listing.save();
    req.flash("success", "Successfully updated listing!");
    res.redirect(`/listings/${listing._id}`);
  } catch (err) {
    console.error("Error updating listing:", err);
    req.flash("error", "Failed to update listing");
    res.redirect("/listings");
  }
};

// -------------------- DELETE LISTING --------------------
module.exports.destroyListing = async (req, res) => {
  try {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
  } catch (err) {
    console.error("Error deleting listing:", err);
    req.flash("error", "Failed to delete listing");
    res.redirect("/listings");
  }
};

