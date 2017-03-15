#include <iostream>
#include <opencv2/opencv.hpp>

using namespace std;
using namespace cv;

void MedianFilter(const Mat &srcImage, Mat &dstImage)
{
  CV_Assert(srcImage.depth() == CV_8U);
  dstImage.create(srcImage.size(), srcImage.type());
  const int nChannels = srcImage.channels();

  uchar tmp[9];

  for (int j = 1; j < srcImage.rows - 1; ++j)
  {
    const uchar *previous = srcImage.ptr<uchar>(j - 1);
    const uchar *current = srcImage.ptr<uchar>(j);
    const uchar *next = srcImage.ptr<uchar>(j + 1);

    uchar *output = dstImage.ptr<uchar>(j);

    for(int i = nChannels; i < nChannels * (srcImage.cols - 1); i++){
      for(int k = 0; k < 3; k++)
      {
        tmp[k] = previous[i - nChannels + k];
        tmp[k + 3] = current[i - nChannels + k];
        tmp[k + 6] = next[i - nChannels + k];
      }

      // print raw array
      for(int k = 0; k < 9; k++) {
        cout << int(tmp[k]) << " ";
      }
      cout << endl;

      // selct sort
      for(int k = 0; k < 5; k++){
        int min = k;
        for(int l = k; l < 9; l++){
          if (tmp[min] > tmp[l]) {
            min = l;
          }
        }

        int temp = tmp[k];
        tmp[k] = tmp[min];
        tmp[min] = temp;
      }

      // print sort result
      for(int k = 0; k < 9; k++) {
        cout << int(tmp[k]) << " ";
      }
      cout << endl;
      // print middle pixel
      cout << int(tmp[4]) << endl;

      *output++ = tmp[4];
    }  
  }
  dstImage.row(0).setTo(Scalar(0));
  dstImage.row(dstImage.rows-1).setTo(Scalar(0));
  dstImage.col(0).setTo(Scalar(0));
  dstImage.col(dstImage.cols-1).setTo(Scalar(0));
}

int main()
{

  Mat srcImage = imread("timg.bmp");
  cvtColor(srcImage, srcImage, CV_BGR2GRAY);
  imshow("原图-中值滤波操作", srcImage);

  Mat dstImage;
  MedianFilter(srcImage, dstImage);

  imshow("结果-中值滤波操作", dstImage);
  waitKey(0);
  return 0;
}
