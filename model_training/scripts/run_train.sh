#!/bin/bash

# PaddleOCR-VL Fine-tuning Execution Script
# Ensure PaddlePaddle and PaddleOCR are installed

# Set environment variables
export CUDA_VISIBLE_DEVICES=0,1

# Create output directory
mkdir -p ../output/ch_PP-OCRv4_VL/

# Start distributed training
python -m paddle.distributed.launch --gpus '0,1' ../finetune.py \
    -c ../configs/finetune.yml \
    2>&1 | tee ../logs/train.log
