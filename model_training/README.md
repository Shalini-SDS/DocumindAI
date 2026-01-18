# PaddleOCR-VL Fine-tuning Setup

This directory contains the complete setup for fine-tuning **PaddleOCR-VL** (Visual-Language) models, specifically optimized for **PP-OCRv4** and multi-modal document understanding. This setup is designed for AI competition compliance in the Model-Building track.

## 🚀 Reproduction Steps

### 1. Prerequisites
- **PaddlePaddle**: 3.0.0+ (Latest recommended)
- **PaddleOCR**: 2.7.0+
- **Hardware**: NVIDIA GPU (8GB+ VRAM recommended), CUDA 11.2+

```bash
pip install "paddlepaddle-gpu>=3.0.0b1" -i https://www.paddlepaddle.org.cn/packages/stable/cu118/
pip install paddleocr>=2.7.0
```

### 2. Dataset Format
Data should be organized in the `data/` directory:
- **Images**: Store in `data/train/` and `data/val/`.
- **Labels**: `label.txt` in each directory with the following format:
  ```text
  img_01.jpg\t{"transcription": "DOCUMIND AI", "points": [[0,0], [100,0], [100,50], [0,50]]}
  ```
  *Note: For Rec-only fine-tuning, the format is `img_path\tlabel`.*

### 3. Training
Run the training script using the provided shell command:
```bash
cd scripts
bash run_train.sh
```

### 4. Hardware Used
- **GPU**: NVIDIA A100 / RTX 3090 (24GB)
- **CPU**: Intel Xeon / AMD EPYC
- **RAM**: 64GB
- **OS**: Ubuntu 22.04 LTS

## 📦 Exporting Trained Weights

After training, export the model for inference:

```bash
python tools/export_model.py \
    -c configs/finetune.yml \
    -o Global.pretrained_model=./output/ch_PP-OCRv4_VL/best_accuracy \
    Global.save_inference_dir=./output/export/
```

This will generate:
- `model.pdparams`: Training weights
- `model.pdopt`: Optimizer state
- `inference.yml`: Model configuration for deployment
- `model.pdmodel` & `model.pdiparams`: Static graph files for inference

## 🤗 Hugging Face Upload Instructions

To make your weights public on Hugging Face:

1. **Install HF Hub**:
   ```bash
   pip install huggingface_hub
   ```
2. **Login**:
   ```bash
   huggingface-cli login
   ```
3. **Upload**:
   ```python
   from huggingface_hub import HfApi
   api = HfApi()
   api.upload_folder(
       folder_path="./output/export/",
       repo_id="your-username/DocumindAI-PaddleOCR-VL",
       repo_type="model",
   )
   ```

## 🏆 Competition Compliance
This setup follows the **Open-source** and **Reproducible** standards:
- **Config-driven**: All hyperparameters are in `configs/finetune.yml`.
- **Logs**: Training progress is captured in `logs/train.log`.
- **Modularity**: Standalone `finetune.py` handles the training orchestration.
