import asyncHandler from 'express-async-handler'
import Product from '../models/careModel.js'
import Care from '../models/careModel.js';

// @desc    Fetch all cares
// @route   GET /api/cares
// @access  Public
const getCares = asyncHandler(async (req, res) => {
    const cares = await Care.find({});
    res.json(cares);
})

// @desc    Fetch single care
// @route   GET /api/cares/:id
// @access  Public
const getCareById = asyncHandler(async (req, res) => {
  const care = await Care.findById(req.params.id)

  if (care) {
    res.json(care)
  } else {
    res.status(404)
    throw new Error('Care not found')
  }
})

// @desc    Delete a care
// @route   DELETE /api/cares/:id
// @access  Private/Admin
const deleteCare = asyncHandler(async (req, res) => {
  const care = await CAre.findById(req.params.id)

  if (care) {
    await Care.findByIdAndDelete(req.params.id)
    res.json({ message: 'Care removed' })
  } else {
    res.status(404)
    throw new Error('Care not found')
  }
})

// @desc    Create a care
// @route   POST /api/cares
// @access  Private/Admin
const createCare = asyncHandler(async (req, res) => {
  const care = new Care({
    customer: 'User Example',
    staff: 'Staff 01',
    method: 'Zalo',
    content: 'Answer questions about price'
  })

  const createdCare = await care.save()
  res.status(201).json(createdCare)
})

// @desc    Update a product
// @route   PUT /api/cares/:id
// @access  Private/Admin
const updateCare = asyncHandler(async (req, res) => {
  const {
    customer,
    staff,
    method,
    content
  } = req.body

  const care = await Care.findById(req.params.id)

  if (care) {
    care.customer = customer
    care.staff = staff
    care.method = method
    care.content = content

    const updatedCare = await care.save()
    res.json(updatedCare)
  } else {
    res.status(404)
    throw new Error('Care not found')
  }
})


export {
  getCares,
  getCareById,
  deleteCare,
  createCare,
  updateCare,
}
