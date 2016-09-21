#include <iostream>
#include <opencv2/opencv.hpp>

using namespace cv;

int main(int argc, char **argv) {
    char *imageName = argv[1];

    Mat image;
    image = imread(imageName, CV_LOAD_IMAGE_COLOR);

    if (argc != 2 || !image.data) {
        std::cout << "No image data" << std::endl;
        return -1;
    }

    Mat gray_image;
    cvtColor(image, gray_image, CV_BGR2GRAY);

    imwrite("../images/Gray_Image.jpg", gray_image);

    namedWindow(imageName, CV_WINDOW_AUTOSIZE);
    namedWindow("Gray Image", CV_WINDOW_AUTOSIZE);

    imshow(imageName, image);
    imshow("Gray Image", gray_image);

    waitKey(0);
    return 0;
}